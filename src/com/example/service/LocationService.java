package com.example.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import com.example.location.CurrentLocationProvider;

public class LocationService extends Service {

    @Override
    public void onCreate() {
        super.onCreate();
        new CurrentLocationProvider(this);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
