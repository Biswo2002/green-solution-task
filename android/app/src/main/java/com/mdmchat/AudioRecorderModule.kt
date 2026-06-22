package com.practices

import android.Manifest
import android.content.pm.PackageManager
import android.media.MediaPlayer
import android.media.MediaRecorder
import android.os.Build
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.IOException
import java.util.UUID

class AudioRecorderModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private var recorder: MediaRecorder? = null
    private var player: MediaPlayer? = null
    private var outputPath: String? = null

    override fun getName(): String = "AudioRecorder"

    @ReactMethod
    fun startRecording(promise: Promise) {
        if (!hasRecordAudioPermission()) {
            promise.reject("permission_denied", "RECORD_AUDIO permission is required.")
            return
        }

        if (recorder != null) {
            promise.reject("already_recording", "Audio recording is already in progress.")
            return
        }

        val outputFile = File(context.cacheDir, "recording-${UUID.randomUUID()}.m4a")
        outputPath = outputFile.absolutePath

        try {
            val mediaRecorder = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                MediaRecorder(context)
            } else {
                @Suppress("DEPRECATION")
                MediaRecorder()
            }

            mediaRecorder.apply {
                setAudioSource(MediaRecorder.AudioSource.MIC)
                setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
                setOutputFile(outputFile.absolutePath)
                setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
                setAudioSamplingRate(44100)
                setAudioEncodingBitRate(96000)
                prepare()
                start()
            }

            recorder = mediaRecorder
            promise.resolve(true)
        } catch (error: IOException) {
            cleanupRecorder()
            promise.reject("recording_start_error", "Unable to start audio recording.", error)
        } catch (error: RuntimeException) {
            cleanupRecorder()
            promise.reject("recording_start_error", "Unable to start audio recording.", error)
        }
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
        val mediaRecorder = recorder
        if (mediaRecorder == null) {
            promise.reject("not_recording", "No active recording to stop.")
            return
        }

        try {
            mediaRecorder.stop()
            mediaRecorder.release()
            recorder = null

            val path = outputPath
            outputPath = null
            if (path.isNullOrBlank()) {
                promise.reject("missing_file", "Recorded file path was not found.")
                return
            }

            promise.resolve("file://$path")
        } catch (error: RuntimeException) {
            cleanupRecorder()
            promise.reject("recording_stop_error", "Unable to stop audio recording cleanly.", error)
        }
    }

    @ReactMethod
    fun playAudio(uri: String, promise: Promise) {
        if (uri.isBlank()) {
            promise.reject("invalid_uri", "Audio URI is required.")
            return
        }

        stopCurrentPlayback()

        try {
            val normalizedPath = uri.removePrefix("file://")
            val mediaPlayer = MediaPlayer().apply {
                setDataSource(normalizedPath)
                prepare()
                start()
                setOnCompletionListener {
                    stopCurrentPlayback()
                }
            }
            player = mediaPlayer
            promise.resolve(true)
        } catch (error: IOException) {
            stopCurrentPlayback()
            promise.reject("playback_error", "Unable to play selected audio.", error)
        } catch (error: RuntimeException) {
            stopCurrentPlayback()
            promise.reject("playback_error", "Unable to play selected audio.", error)
        }
    }

    @ReactMethod
    fun stopAudio(promise: Promise) {
        stopCurrentPlayback()
        promise.resolve(true)
    }

    private fun hasRecordAudioPermission(): Boolean {
        val status = ContextCompat.checkSelfPermission(context, Manifest.permission.RECORD_AUDIO)
        return status == PackageManager.PERMISSION_GRANTED
    }

    private fun stopCurrentPlayback() {
        player?.let {
            if (it.isPlaying) it.stop()
            it.release()
        }
        player = null
    }

    private fun cleanupRecorder() {
        try {
            recorder?.release()
        } catch (_: Exception) {
        } finally {
            recorder = null
            outputPath = null
        }
    }
}
