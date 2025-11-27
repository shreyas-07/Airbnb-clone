# Firebase Storage 403 Error Fix

## Problem
Firebase Storage is blocking public access to landing page images, causing 403 errors.

## Solution: Update Firebase Storage Security Rules

### Step 1: Open Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select your project: **firegram-1r**

### Step 2: Navigate to Storage Rules
1. Click **Storage** in the left sidebar
2. Click the **Rules** tab at the top

### Step 3: Replace the Rules
Copy and paste the following rules:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to landing page images
    match /landing/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Allow public read access to avatars
    match /avatars/{userRole}/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow public read access to property photos
    match /properties/{propertyId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Default: deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 4: Publish
1. Click **Publish** button
2. Wait for confirmation that rules are published

### Step 5: Test
1. Refresh your browser
2. Landing page images should now load without 403 errors

## What These Rules Do
- **landing/** folder: Public read access (anyone can view landing page images)
- **avatars/** folder: Public read, authenticated write (users can upload their own avatars)
- **properties/** folder: Public read, authenticated write (users can upload property photos)
- **All other paths**: Denied by default for security



