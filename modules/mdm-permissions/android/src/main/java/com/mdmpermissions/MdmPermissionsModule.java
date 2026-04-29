package com.mdmpermissions;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MdmPermissionsModule extends ReactContextBaseJavaModule {
    public MdmPermissionsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MdmPermissions";
    }

    // Android implementation uses JS PermissionsAndroid natively, this is just a stub for cross-platform linking
    @ReactMethod
    public void requestAllPermissions(Promise promise) {
        promise.resolve(null);
    }
}
