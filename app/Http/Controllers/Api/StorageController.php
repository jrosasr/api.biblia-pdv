<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StorageController extends Controller
{
    /**
     * Serve a file from the public storage.
     *
     * @param string $path
     * @return StreamedResponse|void
     */
    public function show(string $path)
    {
        // Prevent directory traversal attacks
        if (strpos($path, '..') !== false) {
            abort(403);
        }

        // Check if file exists in the public disk
        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        // Return the file
        return Storage::disk('public')->response($path);
    }
}
