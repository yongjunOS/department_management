package com.example.departmentmanagement.dto;

import lombok.*;

import java.sql.Timestamp;


public class MemberDTO {
    private String id;
    private String authorityId;
    private String username;
    private String password;
    private String departmentName;
    private Timestamp clockIn;
    private Timestamp clockOut;
    private String timekepping;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthorityId() {
        return authorityId;
    }

    public void setAuthorityId(String authorityId) {
        this.authorityId = authorityId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Timestamp getClockIn() {
        return clockIn;
    }

    public void setClockIn(Timestamp clockIn) {
        this.clockIn = clockIn;
    }

    public Timestamp getClockOut() {
        return clockOut;
    }

    public void setClockOut(Timestamp clockOut) {
        this.clockOut = clockOut;
    }

    public String getTimekepping() {
        return timekepping;
    }

    public void setTimekepping(String timekepping) {
        this.timekepping = timekepping;
    }

    public MemberDTO(String id, String authorityId, String username, String password, String departmentName, Timestamp clockIn, Timestamp clockOut, String timekepping) {
        this.id = id;
        this.authorityId = authorityId;
        this.username = username;
        this.password = password;
        this.departmentName = departmentName;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.timekepping = timekepping;
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
                "id='" + id + '\'' +
                ", authorityId='" + authorityId + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", clockIn=" + clockIn +
                ", clockOut=" + clockOut +
                ", timekepping='" + timekepping + '\'' +
                '}';
    }
}
