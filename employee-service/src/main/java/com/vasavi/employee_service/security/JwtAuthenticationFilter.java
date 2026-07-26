package com.vasavi.employee_service.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.vasavi.employee_service.service.CustomUserDetailsService;
import com.vasavi.employee_service.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

    	 System.out.println("========== JWT FILTER ==========");
         System.out.println("URI : " + request.getRequestURI());
    	
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header : " + authHeader);


        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Bearer token missing");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
        String email = jwtService.extractEmail(token);
        System.out.println("Email : " + email);


        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            System.out.println("User Loaded : " + userDetails.getUsername());

            if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request));

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
                System.out.println("Authentication Success");

            }
            else {
                System.out.println("Token Invalid");
            }
        }
    } catch (Exception ex) {
        System.out.println("JWT ERROR : " + ex.getMessage());
        ex.printStackTrace();
    }


        filterChain.doFilter(request, response);
    }
}