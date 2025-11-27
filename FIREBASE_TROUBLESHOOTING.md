# Firebase Storage Image Troubleshooting

## Issue: Images not loading (403 errors)

### Step 1: Verify Firebase Storage Rules Were Published

1. Go to: https://console.firebase.google.com/project/firegram-1r/storage/rules
2. Check if the rules include:
   ```javascript
   match /landing/{allPaths=**} {
     allow read: if true;
   }
   ```
3. If not present, add it and click **Publish**
4. Wait 1-2 minutes for rules to propagate

### Step 2: Verify Images Exist in Firebase Storage

1. Go to: https://console.firebase.google.com/project/firegram-1r/storage/files
2. Check if these folders/files exist:
   - `landing/highlights/standout-stays.jpg`
   - `landing/highlights/effortless-hosting.jpg`
   - `landing/highlights/traveler-delights.jpg`
   - `landing/owner-features/calendar-sync.jpg`
   - `landing/owner-features/automated-updates.jpg`
   - `landing/owner-features/performance-insights.jpg`

### Step 3: If Images Don't Exist - Upload Them

**Option A: Upload via Firebase Console**
1. Go to: https://console.firebase.google.com/project/firegram-1r/storage/files
2. Click "Get Started" or "Upload file"
3. Create folders: `landing/highlights/` and `landing/owner-features/`
4. Upload the images to the correct paths

**Option B: Upload via Firebase CLI**
```bash
firebase login
firebase storage:upload <local-image-path> landing/highlights/standout-stays.jpg
```

### Step 4: Clear Browser Cache

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache completely
3. Try in incognito/private window

### Step 5: Check Browser Console

Open browser DevTools (F12) and check:
- Are there still 403 errors?
- What's the exact error message?
- Check Network tab for failed requests

### Step 6: Verify Firebase Config

Check that your frontend is using the correct Firebase project:
- Project ID: `firegram-1r`
- Storage Bucket: `firegram-1r.appspot.com`

## Quick Test

Open browser console on your site and run:
```javascript
// Check Firebase Storage config
console.log('Storage bucket:', firebase.app().options.storageBucket);

// Try to access an image directly
const storage = firebase.storage();
const ref = storage.ref('landing/highlights/standout-stays.jpg');
ref.getDownloadURL().then(url => {
  console.log('Image URL:', url);
  window.open(url);
}).catch(err => {
  console.error('Error:', err.code, err.message);
});
```

## Most Common Issues

1. **Rules not published** - Must click "Publish" in Firebase Console
2. **Images don't exist** - Need to upload images to Firebase Storage
3. **Wrong Firebase project** - Verify project ID matches
4. **Browser cache** - Clear cache or use incognito mode
5. **Rules propagation delay** - Wait 1-2 minutes after publishing



