package com.example.departmentmanagement.dto;

import lombok.*;

import java.sql.Timestamp;


public class MemberDTO {
    private String id;
    private String username;
    private String password;
    private String departmentName;
    private Timestamp clockIn;
    private Timestamp clockOut;
    private String timekepping;

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Timestamp getClockIn() {
        return clockIn;
    }

    public Timestamp getClockOut() {
        return clockOut;
    }

    public String getTimekepping() {
        return timekepping;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setClockIn(Timestamp clockIn) {
        this.clockIn = clockIn;
    }

    public void setClockOut(Timestamp clockOut) {
        this.clockOut = clockOut;
    }

    public void setTimekepping(String timekepping) {
        this.timekepping = timekepping;
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", clockIn=" + clockIn +
                ", clockOut=" + clockOut +
                ", timekepping='" + timekepping + '\'' +
                '}';
    }

    public MemberDTO(String id, String username, String password, String departmentName, Timestamp clockIn, Timestamp clockOut, String timekepping) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.departmentName = departmentName;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.timekepping = timekepping;
    }
}
