package com.example.userservice.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.userservice.models.ConfirmationToken;
import com.example.userservice.repo.ConfirmationRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.userservice.models.Role;
import com.example.userservice.models.User;
import com.example.userservice.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

/**
 * @author Get Arrays (https://www.getarrays.io/)
 * @version 1.0
 * @since 7/10/2021
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {


    private final UserService userService;


    @Autowired
    private ConfirmationRepo confirmationRepo;






    @GetMapping("/users")
    public ResponseEntity<List<User>>getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user/infos")
    public User getUserInfos(HttpServletRequest request){
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        String token = authorizationHeader;
        return userService.getUser(decoodejwt(token));
    }
    public String decoodejwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String email = decodedJWT.getSubject();
        return email;
    }

    @PostMapping("/user/save")
    public ResponseEntity<String>saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        if (userService.getUser(user.getEmail()) == null){

            User user1 = userService.saveUser(user);
            ConfirmationToken confirmationToken = new ConfirmationToken(user);

            confirmationRepo.save(confirmationToken);

            sendConfirmationEmail(confirmationToken , user.getEmail());




            return ResponseEntity.created(uri).body("User created successfully");
        }
        else {
            System.out.println("Already exist a user with this email , try again");
            return null;
        }

    }

    @GetMapping("getName")
    public Map<String,String> getName(@RequestParam("userid") Long id){
        Map<String,String> map = new HashMap<>();
        map.put("name" , userService.getUserById(id).getNom() + " " +  userService.getUserById(id).getPrenom());
        System.out.println("ur id is " + id);
        return map;
    }

    @GetMapping(value = "/verify" , produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> verify(@RequestParam("token") String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            String email = decodedJWT.getSubject();
            String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            stream(roles).forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role));
            });
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            Map<String, String> infos = new HashMap<>();
            infos.put("message", "valid");
            System.out.println(userService.getUser(email).getId().toString());
            infos.put("userid" , userService.getUser(email).getId().toString());

            return infos;
        }
        catch (Exception exception) {
            System.out.println("Error logging in: " + exception.getMessage());
            Map<String, String> infos = new HashMap<>();
            infos.put("message", "Unvalid");
            return infos;
        }
    }

    @PostMapping(value = "/verifyjs" , produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> verifyjs(@RequestParam("token") String token , @RequestBody String body){
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            String email = decodedJWT.getSubject();
            String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            stream(roles).forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role));
            });
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            Map<String, String> infos = new HashMap<>();
            infos.put("message", "valid");
            System.out.println(userService.getUser(email).getId().toString());

            JSONObject json = new JSONObject(body);
            System.out.println(json.getString("receiver"));

            User receiver = userService.getUserById(Long.valueOf(json.getString("receiver")));

            infos.put("senderId" , userService.getUser(email).getId().toString());
            infos.put("receiverId" ,  receiver.getId().toString());
            infos.put("NomReceiver" ,  receiver.getNom());
            infos.put("PrenomReceiver" ,  receiver.getPrenom());


            return infos;
        }
        catch (Exception exception) {
            System.out.println("Error logging in: " + exception.getMessage());
            Map<String, String> infos = new HashMap<>();
            infos.put("message", "Unvalid");
            return infos;
        }
    }



    private void sendConfirmationEmail(ConfirmationToken confirmationToken , String email) {

        final String username = "@gmail.com";
        final String password = "";

        Properties props = new Properties();
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", true);
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("no-reply@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(email));
            message.setSubject("Testing Subject");
            message.setText("Dear Mail Crawler,\n"
                    + "To confirm your account, please click here : "
                    +"http://localhost:8081/api/confirm-account?token="+confirmationToken.getConfirmationToken());

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/confirm-account")
    public String confirmation(@RequestParam("token") String token){

        ConfirmationToken ctoken = confirmationRepo.findByConfirmationToken(token);

        if (ctoken != null){
            User user = userService.getUser(ctoken.getUser().getEmail());
            user.setEnabled(true);
            userService.saveChanges(user);
            return "Email confirmed Successfully";
        }
        else {
            return "This url Doesn't exist";
        }
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/delete")
    public ResponseEntity<String> deleteUser(@RequestParam("email") String email) throws JSONException {
//        JSONObject jsonObject = new JSONObject(json);
//        String email = jsonObject.getString("email");
//        System.out.println(email);
        String response = userService.deleteUser(email);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null ) {
            try {
                String refresh_token = authorizationHeader;
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String email = decodedJWT.getSubject();
                User user = userService.getUser(email);
                String access_token = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
