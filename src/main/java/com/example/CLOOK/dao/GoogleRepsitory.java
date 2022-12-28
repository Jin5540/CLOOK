package com.example.CLOOK.dao;

import org.springframework.stereotype.Repository;

import com.example.CLOOK.domain.GoogleVO;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;

import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.AppendValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Arrays;
import java.util.Calendar;

@Repository
public class GoogleRepsitory {
    private static Sheets sheetsService;
    private static final String APPLICATION_NAME = "Clook_v1.0_nps";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SPREADSEET_ID = "1sphagJ36y1td5fYkzhvS9FJin0ByGfqzi5fCZgRn0h8";
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";



    private static Credential authorize() throws IOException, GeneralSecurityException {
        InputStream in = GoogleRepsitory.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
            GsonFactory.getDefaultInstance(), new InputStreamReader(in)
        );

        List<String> scopes = Arrays.asList(SheetsScopes.SPREADSHEETS);

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(GoogleNetHttpTransport.newTrustedTransport(), 
        GsonFactory.getDefaultInstance(), clientSecrets, scopes)
            .setDataStoreFactory(new FileDataStoreFactory(new java.io.File("token")))
            .setAccessType("offline")
            .build();
        
        Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");

        return credential;
    }

    public static Sheets getSheetsService() throws IOException, GeneralSecurityException {
        Credential credential = authorize();
        return new Sheets.Builder(GoogleNetHttpTransport.newTrustedTransport(), GsonFactory.getDefaultInstance(), credential).setApplicationName(APPLICATION_NAME)
        .build();
    }

    public static void main(GoogleVO googleVO) throws IOException, GeneralSecurityException{
        sheetsService = getSheetsService();

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        SimpleDateFormat nowformatter = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        String nowformat = nowformatter.format(cal.getTime());
        /*String range = "A2:F10";

        ValueRange response = sheetsService.spreadsheets().values()
        .get(SPREADSEET_ID, range)
        .execute();

        List<List<Object>> values = response.getValues();

        if(values == null || values.isEmpty()){
            System.out.println("No data found!");
        }else{
            for(List row : values){
                System.out.printf("%s %s from %s\n", row.get(5), row.get(4), row.get(1));
            }
        }*/

        ValueRange appendBody = new ValueRange()
        .setValues(Arrays.asList(Arrays.asList(nowformat,googleVO.getNum(),googleVO.getComment())));

        AppendValuesResponse appendResult = sheetsService.spreadsheets().values()
        .append(SPREADSEET_ID, "A1", appendBody)
        .setValueInputOption("USER_ENTERED")
        .setInsertDataOption("INSERT_ROWS")
        .setIncludeValuesInResponse(true)
        .execute();


    }
}
