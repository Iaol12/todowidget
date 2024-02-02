package com.todowidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.widget.RemoteViews;

import android.content.Intent;
import android.app.PendingIntent;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class TodoWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{}");
            JSONObject appData = new JSONObject(appString);

            // Retrieve the array of strings
            JSONArray stringArray = appData.optJSONArray("stringArray");

            if (stringArray != null) {
                // Convert the JSONArray to a string array
                String[] strings = new String[stringArray.length()];
                for (int i = 0; i < stringArray.length(); i++) {
                    strings[i] = stringArray.getString(i);
                }

                // Use the array of strings as needed
                // For example, concatenate and set it in your widget views
                String concatenatedString = TextUtils.join("\n", strings);

                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.todo_widget);
                views.setTextViewText(R.id.appwidget_text, concatenatedString);

                // clickables?
                Intent intent = new Intent(context, MainActivity.class);

                PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
                views.setOnClickPendingIntent(R.id.layout, pendingIntent);

                appWidgetManager.updateAppWidget(appWidgetId, views);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}