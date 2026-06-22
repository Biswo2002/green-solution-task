package com.practices

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class HapticsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ZorrroHaptics"
    }

    @ReactMethod
    fun trigger(type: String) {
        val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vibratorManager = reactApplicationContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
            vibratorManager.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            reactApplicationContext.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }

        if (!vibrator.hasVibrator()) return

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val effect = when (type) {
                "light" -> VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE)
                "medium" -> VibrationEffect.createOneShot(100, VibrationEffect.DEFAULT_AMPLITUDE)
                "heavy" -> VibrationEffect.createOneShot(150, VibrationEffect.DEFAULT_AMPLITUDE)
                "success" -> VibrationEffect.createWaveform(longArrayOf(0, 50, 100, 100), -1)
                "warning" -> VibrationEffect.createWaveform(longArrayOf(0, 100, 100, 100), -1)
                "error" -> VibrationEffect.createWaveform(longArrayOf(0, 100, 100, 100, 100, 100), -1)
                "selection" -> VibrationEffect.createOneShot(30, VibrationEffect.DEFAULT_AMPLITUDE)
                else -> VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE)
            }
            vibrator.vibrate(effect)
        } else {
            @Suppress("DEPRECATION")
            when (type) {
                "light" -> vibrator.vibrate(50)
                "medium" -> vibrator.vibrate(100)
                "heavy" -> vibrator.vibrate(150)
                "success" -> vibrator.vibrate(longArrayOf(0, 50, 100, 100), -1)
                "warning" -> vibrator.vibrate(longArrayOf(0, 100, 100, 100), -1)
                "error" -> vibrator.vibrate(longArrayOf(0, 100, 100, 100, 100, 100), -1)
                "selection" -> vibrator.vibrate(30)
                else -> vibrator.vibrate(50)
            }
        }
    }
}
