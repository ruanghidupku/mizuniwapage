// functions/api/sheets.js
// Cloudflare Pages Function for secure Google Sheets API access

export async function onRequest(context) {
    // Get environment variables from Cloudflare
    const { env, request } = context;
    
    // CORS headers for your domain
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', // Change to your domain in production
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };
    
    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }
    
    // Only allow GET requests
    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }), 
            { 
                status: 405, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
    
    try {
        // Get credentials from environment variables
        const SHEET_ID = env.GOOGLE_SHEET_ID;
        const API_KEY = env.GOOGLE_API_KEY;
        const RANGE = env.SHEET_RANGE || 'data_kamar!A:I';
        
        // Validate environment variables
        if (!SHEET_ID || !API_KEY) {
            throw new Error('Missing configuration');
        }
        
        // Construct Google Sheets API URL
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        
        // Fetch data from Google Sheets
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
            }
        });
        
        // Check if request was successful
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Google Sheets API error:', errorData);
            
            // Don't expose detailed error messages to client
            throw new Error('Failed to fetch data');
        }
        
        // Get the data
        const data = await response.json();
        
        // Cache the response for 5 minutes
        const headers = {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300', // 5 minutes
        };
        
        // Return the data
        return new Response(JSON.stringify(data), { headers });
        
    } catch (error) {
        console.error('Worker error:', error);
        
        // Return error response
        const headers = {
            ...corsHeaders,
            'Content-Type': 'application/json',
        };
        
        return new Response(
            JSON.stringify({ 
                error: 'Failed to fetch room data',
                message: error.message 
            }), 
            { 
                status: 500, 
                headers 
            }
        );
    }
}