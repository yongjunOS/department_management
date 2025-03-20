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

    @GetMapping("/selectAll")
    public List<MemberDTO> selectAll() {
        //회원목록을 조회하여 반환한다.
        List<MemberDTO> list = memberService.allMember();
        return list;
    }

    // 직원 등록 API 추가
    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO) {
        try {
            boolean result = memberService.registerMember(memberDTO);
            if (result) {
                return ResponseEntity.ok().body("직원이 성공적으로 등록되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("직원 등록에 실패했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("직원 등록 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 직원 정보 수정 API
    @PutMapping("/update")
    public ResponseEntity<?> updateMember(@RequestBody MemberDTO memberDTO) {
        try {
            boolean result = memberService.updateMember(memberDTO);
            if (result) {
                return ResponseEntity.ok().body("직원 정보가 성공적으로 수정되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("해당 ID의 직원을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("직원 정보 수정 중 오류가 발생했습니다: " + e.getMessage());
        }
    }


    //직원 삭제  delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable String id) {
        try {
            boolean result = memberService.deleteMember(id);
            if (result) {
                return ResponseEntity.ok().body("직원이 성공적으로 삭제되었습니다");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("해당 id의 직원을 찾을 수 없습니다");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("직원 삭제중 오류가 발생했습니다" +e.getMessage());
        }
    }



}


