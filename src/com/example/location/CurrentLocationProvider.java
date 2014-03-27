package com.example.location;

import android.content.Context;
import android.content.SharedPreferences;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.preference.PreferenceManager;
import android.telephony.TelephonyManager;
import com.example.service.SendLocationAsyncTask;
import com.google.gson.Gson;

import static android.location.LocationManager.GPS_PROVIDER;
import static android.location.LocationManager.NETWORK_PROVIDER;

public class CurrentLocationProvider extends LocationListenerAdapter {
    public static final String LOCATION = "LOCATION";
    public static final int MIN_TIME = 1000 * 30;
    public static final int MIN_DISTANCE = 5;
    private static final int ACCURACY_THRESHOLD = 200;
    private Context context;

    public CurrentLocationProvider(Context context) {
        this.context = context;
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(GPS_PROVIDER, MIN_TIME, MIN_DISTANCE, this);
        locationManager.requestLocationUpdates(NETWORK_PROVIDER, MIN_TIME, MIN_DISTANCE, this);

        setCurrentBestLocation(locationManager.getLastKnownLocation(locationManager.getBestProvider(new Criteria(), false)));
    }

    @Override
    public void onLocationChanged(Location location) {
        if(isBetterLocation(location)) {
            setCurrentBestLocation(location);
        }
        String imei = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
        new SendLocationAsyncTask().execute(location, imei);
    }

    private boolean isBetterLocation(Location location) {
        Location currentBestLocation = getCurrentBestLocation();
        if (currentBestLocation == null) {
            return true;
        }
        long timeDelta = location.getTime() - currentBestLocation.getTime();
        boolean isNewer = timeDelta > 0;

        if (timeDelta > MIN_TIME) {
            return true;
        }

        int accuracyDelta = (int) (location.getAccuracy() - currentBestLocation.getAccuracy());
        boolean isMoreAccurate = accuracyDelta < 0;
        boolean isSignificantlyLessAccurate = accuracyDelta > ACCURACY_THRESHOLD;
        boolean isFromSameProvider = isSameProvider(location.getProvider(), currentBestLocation.getProvider());

        if (isMoreAccurate) {
            return true;
        } else if (isFromSameProvider && isNewer) {
            return true;
        } else if (isNewer && !isSignificantlyLessAccurate) {
            return true;
        }

        return false;
    }

    private boolean isSameProvider(String provider1, String provider2) {
        return provider1.equals(provider2);
    }

    private Location getCurrentBestLocation() {
        String locationJson = PreferenceManager.getDefaultSharedPreferences(context).getString(LOCATION, null);
        return (locationJson == null ) ? null : new Gson().fromJson(locationJson, Location.class);
    }

    private void setCurrentBestLocation(Location location) {
        SharedPreferences.Editor editor = PreferenceManager.getDefaultSharedPreferences(context).edit();
        editor.putString(LOCATION, new Gson().toJson(location));
        editor.commit();
    }

}
