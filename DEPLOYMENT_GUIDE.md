# Cloud Font Tagger - Deployment Instructions

## Step 2: Create Your Cloud Project Folder

1. **Create a new folder on your computer** called `font-tagger-cloud`

2. **Download these files from Claude** and put them in the folder:
   - `index.html` 
   - `package.json`
   - `vercel.json`
   - `api/fonts.js` (create `api` folder first)

3. **Create the fonts folder structure:**
   ```
   font-tagger-cloud/
   ├── index.html
   ├── package.json  
   ├── vercel.json
   ├── api/
   │   └── fonts.js
   └── public/
       └── fonts/
           └── (your font files go here)
   ```

## Step 3: Add Your Fonts

1. **Create the `public` folder** in your `font-tagger-cloud` directory
2. **Create the `fonts` folder** inside `public`
3. **Copy your font files** (.ttf, .otf) into `public/fonts/`
   
   **Start small:** Copy 50-100 fonts for testing first
   
   **File naming:** Make sure font filenames are web-safe:
   - No spaces (use hyphens or underscores)
   - No special characters except hyphens/underscores
   - Examples: `Arial-Bold.ttf`, `Times_New_Roman.otf`

## Step 4: Deploy to Vercel

### Option A: Drag and Drop (Easiest)
1. **Go to https://vercel.com/dashboard**
2. **Click "Add New..." → "Project"**
3. **Drag your entire `font-tagger-cloud` folder** onto the Vercel page
4. **Click "Deploy"**
5. **Wait for deployment to complete** (~2 minutes)
6. **Get your URL:** `https://your-project-name.vercel.app`

### Option B: GitHub (More Advanced)
1. Upload your `font-tagger-cloud` folder to a GitHub repository
2. Connect Vercel to the GitHub repo
3. Deploy automatically

## Step 5: Configure and Test

1. **Open your new URL** in a browser
2. **Click ⚙ Settings** and enter your Supabase credentials:
   - Supabase URL: `https://hlqeoouwsoxjphdunzya.supabase.co`
   - Anon Key: (your anon key)
   - Service Key: (your service key)
3. **Check that "cloud online" appears** (green dot)
4. **Verify fonts load** in the left panel
5. **Test tagging** a font and saving

## Step 6: Share with Your Team

Once everything works:
1. **Share the URL:** `https://your-project-name.vercel.app`
2. **Anyone can access it** - no software installation needed
3. **Multiple people can tag simultaneously**
4. **All changes save to your shared Supabase database**

## Troubleshooting

**"cloud offline"** → API endpoint issue, check Vercel function logs
**"Fonts directory not found"** → Make sure `public/fonts/` exists with font files
**No fonts appear** → Check font file extensions (.ttf, .otf, .woff, .woff2)
**Can't save** → Check Supabase credentials in Settings

## Adding More Fonts Later

1. **Go to your Vercel dashboard**
2. **Find your project** → Settings → Functions
3. **Upload more fonts** to the `public/fonts/` directory
4. **Redeploy** (Vercel does this automatically)

Your cloud font tagger is now ready! 🚀
