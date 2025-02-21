package com.example.departmentmanagement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.example.departmentmanagement")
public class DepartmentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(DepartmentManagementApplication.class, args);
    }

}
