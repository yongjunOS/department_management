package com.example.departmentmanagement.controller;


import com.example.departmentmanagement.dto.MemberDTO;
import com.example.departmentmanagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController// @Controller + ResponsBody 이 두개합친게 RestfulController이다
public class MemberController {


    @Autowired
    MemberService memberService;

    @RequestMapping(value = "/base", method = RequestMethod.GET) //RequestMethod.GET 안적어도 자동으로 GET 설정되긴 한다.
    public String base() {
        System.out.println("통신성공");
        return "통신성공";
    }


    @RequestMapping(value = "/dbTest")
    public List<MemberDTO> dbTest() {
        System.out.println("dbTest");

        List<MemberDTO> list = memberService.allMember();

        return list;
    }

    






}
