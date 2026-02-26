<?php
// Hostinger PHP wrapper for Node.js backend
// This file redirects API calls to the Node backend

$request_uri = $_SERVER['REQUEST_URI'];

// API calls go to Node backend
if (strpos($request_uri, '/api/') === 0) {
    $backend_url = 'http://localhost:3002' . $request_uri;
    
    // Forward the request
    $ch = curl_init($backend_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    
    // Forward request method
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
    
    // Forward headers
    $headers = array();
    foreach (getallheaders() as $key => $value) {
        $headers[] = "$key: $value";
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    // Forward body for POST/PUT
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
    }
    
    $response = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $header_size);
    $body = substr($response, $header_size);
    
    curl_close($ch);
    
    // Forward response headers
    $header_lines = explode("\n", $headers);
    foreach ($header_lines as $header) {
        if (strpos($header, 'HTTP/') === 0) {
            header($header);
        } elseif (strpos($header, 'Content-Type:') === 0) {
            header($header);
        }
    }
    
    echo $body;
    exit;
}

// Serve the React app
include 'index.html';
