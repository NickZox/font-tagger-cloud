// Vercel API endpoint to serve fonts and font list
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { font } = req.query;
  
  // If no font parameter, return list of available fonts
  if (!font) {
    try {
      // Import fs dynamically (Node.js built-in)
      const fs = await import('fs');
      const path = await import('path');
      
      // Get list of font files from public/fonts directory
      const fontsDir = path.join(process.cwd(), 'public', 'fonts');
      
      // Check if fonts directory exists
      if (!fs.existsSync(fontsDir)) {
        return res.status(404).json({ 
          error: 'Fonts directory not found',
          message: 'Please create public/fonts/ directory and upload font files'
        });
      }
      
      const files = fs.readdirSync(fontsDir);
      const fontFiles = files.filter(file => 
        /\.(ttf|otf|woff|woff2)$/i.test(file)
      );
      
      return res.json(fontFiles);
      
    } catch (error) {
      console.error('Error reading fonts directory:', error);
      return res.status(500).json({ 
        error: 'Failed to read fonts directory',
        message: error.message 
      });
    }
  }
  
  // Serve specific font file
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    // Sanitize font filename to prevent directory traversal
    const safeFontName = path.basename(font);
    const fontPath = path.join(process.cwd(), 'public', 'fonts', safeFontName);
    
    // Check if font file exists
    if (!fs.existsSync(fontPath)) {
      return res.status(404).json({ error: 'Font not found' });
    }
    
    // Read font file
    const fontData = fs.readFileSync(fontPath);
    
    // Determine content type based on file extension
    const ext = path.extname(safeFontName).toLowerCase();
    const contentTypes = {
      '.ttf': 'font/ttf',
      '.otf': 'font/otf',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2'
    };
    
    const contentType = contentTypes[ext] || 'application/octet-stream';
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hour cache
    res.setHeader('Content-Length', fontData.length);
    
    return res.send(fontData);
    
  } catch (error) {
    console.error('Error serving font:', error);
    return res.status(500).json({ 
      error: 'Failed to serve font',
      message: error.message 
    });
  }
}
