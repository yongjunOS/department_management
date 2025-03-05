package com.example.departmentmanagement.controller;


import com.example.departmentmanagement.dto.MemberDTO;
import com.example.departmentmanagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDTO memberDTO) {
        MemberDTO user = memberService.login(memberDTO.getId(), memberDTO.getPassword());

        if (user != null) {
            // 비밀번호는 보안을 위해서 응답에서 제외
            user.setPassword(null);
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }

    






}
