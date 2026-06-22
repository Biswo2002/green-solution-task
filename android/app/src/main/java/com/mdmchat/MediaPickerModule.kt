package com.practices

import android.app.Activity
import android.content.Intent
import android.database.Cursor
import android.graphics.Bitmap
import android.net.Uri
import android.provider.MediaStore
import android.provider.OpenableColumns
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.util.UUID

class MediaPickerModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context), ActivityEventListener {
    private var imagePromise: Promise? = null
    private var documentPromise: Promise? = null

    private val requestImage = 5001
    private val requestCamera = 5002
    private val requestDocument = 5003

    init {
        context.addActivityEventListener(this)
    }

    override fun getName(): String = "MediaPicker"

    @ReactMethod
    fun pickImage(source: String?, promise: Promise) {
        val activity = context.currentActivity
        if (activity == null) {
            promise.reject("no_activity", "No active activity found.")
            return
        }
        if (imagePromise != null) {
            promise.reject("busy", "An image request is already in progress.")
            return
        }

        imagePromise = promise
        val useCamera = source == "camera"
        val intent = if (useCamera) {
            // WhatsApp-like entry: from camera flow user can switch to gallery.
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI).apply {
                type = "image/*"
            }
            Intent.createChooser(galleryIntent, "Select image").apply {
                putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(cameraIntent))
            }
        } else {
            Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI).apply {
                type = "image/*"
            }
        }

        try {
            activity.startActivityForResult(intent, if (useCamera) requestCamera else requestImage)
        } catch (error: Exception) {
            imagePromise = null
            promise.reject("picker_error", "Unable to open image picker.", error)
        }
    }

    @ReactMethod
    fun pickDocument(promise: Promise) {
        val activity = context.currentActivity
        if (activity == null) {
            promise.reject("no_activity", "No active activity found.")
            return
        }
        if (documentPromise != null) {
            promise.reject("busy", "A document request is already in progress.")
            return
        }

        documentPromise = promise
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
        }

        try {
            activity.startActivityForResult(intent, requestDocument)
        } catch (error: Exception) {
            documentPromise = null
            promise.reject("picker_error", "Unable to open document picker.", error)
        }
    }

    @ReactMethod
    fun getRecentImages(limit: Int, promise: Promise) {
        if (!hasImagePermission()) {
            promise.reject("permission_denied", "Photos permission is required to load gallery images.")
            return
        }

        val safeLimit = limit.coerceIn(1, 60)
        val projection = arrayOf(
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.MIME_TYPE,
            MediaStore.Images.Media.SIZE,
        )

        try {
            val result = Arguments.createArray()
            val cursor = context.contentResolver.query(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                projection,
                null,
                null,
                "${MediaStore.Images.Media.DATE_ADDED} DESC",
            )

            cursor?.use {
                var count = 0
                val idIndex = it.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
                val nameIndex = it.getColumnIndex(MediaStore.Images.Media.DISPLAY_NAME)
                val mimeIndex = it.getColumnIndex(MediaStore.Images.Media.MIME_TYPE)
                val sizeIndex = it.getColumnIndex(MediaStore.Images.Media.SIZE)

                while (it.moveToNext() && count < safeLimit) {
                    val id = it.getLong(idIndex)
                    val contentUri = Uri.withAppendedPath(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id.toString())
                    val imageMap = Arguments.createMap().apply {
                        putString("uri", contentUri.toString())
                        putString("name", if (nameIndex != -1) it.getString(nameIndex) else "image-$id.jpg")
                        if (mimeIndex != -1) putString("mimeType", it.getString(mimeIndex) ?: "image/*")
                        if (sizeIndex != -1) putDouble("size", it.getLong(sizeIndex).toDouble())
                    }
                    result.pushMap(imageMap)
                    count += 1
                }
            }

            promise.resolve(result)
        } catch (error: Exception) {
            promise.reject("gallery_error", "Unable to load recent images.", error)
        }
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == requestImage || requestCode == requestCamera) {
            val promise = imagePromise
            imagePromise = null

            if (promise == null) return
            if (resultCode != Activity.RESULT_OK) {
                promise.reject("cancelled", "Image picking was cancelled.")
                return
            }

            try {
                if (requestCode == requestCamera) {
                    val selectedUri = data?.data
                    if (selectedUri != null) {
                        val metadata = queryFileMetadata(selectedUri)
                        val payload = Arguments.createMap().apply {
                            putString("uri", selectedUri.toString())
                            putString("name", metadata.name ?: "image-${UUID.randomUUID()}.jpg")
                            putString("mimeType", metadata.mimeType ?: "image/*")
                            metadata.size?.let { putDouble("size", it.toDouble()) }
                        }
                        promise.resolve(payload)
                        return
                    }

                    val bitmap = data?.extras?.get("data") as? Bitmap
                    if (bitmap == null) {
                        promise.reject("no_image", "No image captured from camera.")
                        return
                    }
                    val file = writeBitmapToCache(bitmap)
                    val payload = Arguments.createMap().apply {
                        putString("uri", Uri.fromFile(file).toString())
                        putString("name", file.name)
                        putString("mimeType", "image/jpeg")
                        putInt("size", file.length().toInt())
                        putInt("width", bitmap.width)
                        putInt("height", bitmap.height)
                    }
                    promise.resolve(payload)
                    return
                }

                val imageUri = data?.data
                if (imageUri == null) {
                    promise.reject("no_image", "No image selected.")
                    return
                }

                val metadata = queryFileMetadata(imageUri)
                val payload = Arguments.createMap().apply {
                    putString("uri", imageUri.toString())
                    putString("name", metadata.name ?: "image-${UUID.randomUUID()}.jpg")
                    putString("mimeType", metadata.mimeType ?: "image/*")
                    metadata.size?.let { putDouble("size", it.toDouble()) }
                }
                promise.resolve(payload)
            } catch (error: Exception) {
                promise.reject("image_error", "Failed to process selected image.", error)
            }
        }

        if (requestCode == requestDocument) {
            val promise = documentPromise
            documentPromise = null

            if (promise == null) return
            if (resultCode != Activity.RESULT_OK) {
                promise.reject("cancelled", "Document picking was cancelled.")
                return
            }

            val documentUri = data?.data
            if (documentUri == null) {
                promise.reject("no_document", "No document selected.")
                return
            }

            try {
                val metadata = queryFileMetadata(documentUri)
                val payload = Arguments.createMap().apply {
                    putString("uri", documentUri.toString())
                    putString("name", metadata.name ?: "document")
                    putString("mimeType", metadata.mimeType ?: "application/octet-stream")
                    metadata.size?.let { putDouble("size", it.toDouble()) }
                }
                promise.resolve(payload)
            } catch (error: Exception) {
                promise.reject("document_error", "Failed to process selected document.", error)
            }
        }
    }

    override fun onNewIntent(intent: Intent) = Unit

    private data class FileMetadata(val name: String?, val size: Long?, val mimeType: String?)

    private fun queryFileMetadata(uri: Uri): FileMetadata {
        val resolver = context.contentResolver
        var name: String? = null
        var size: Long? = null

        val cursor: Cursor? = resolver.query(uri, null, null, null, null)
        cursor?.use {
            val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            val sizeIndex = it.getColumnIndex(OpenableColumns.SIZE)
            if (it.moveToFirst()) {
                if (nameIndex != -1) name = it.getString(nameIndex)
                if (sizeIndex != -1) size = it.getLong(sizeIndex)
            }
        }

        val mimeType = resolver.getType(uri)
        return FileMetadata(name = name, size = size, mimeType = mimeType)
    }

    @Throws(IOException::class)
    private fun writeBitmapToCache(bitmap: Bitmap): File {
        val file = File(context.cacheDir, "camera-${UUID.randomUUID()}.jpg")
        FileOutputStream(file).use { out ->
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out)
            out.flush()
        }
        return file
    }

    private fun hasImagePermission(): Boolean {
        val readMediaStatus = ContextCompat.checkSelfPermission(
            context,
            android.Manifest.permission.READ_MEDIA_IMAGES,
        )
        val readStorageStatus = ContextCompat.checkSelfPermission(
            context,
            android.Manifest.permission.READ_EXTERNAL_STORAGE,
        )
        return readMediaStatus == PackageManager.PERMISSION_GRANTED || readStorageStatus == PackageManager.PERMISSION_GRANTED
    }
}
