package com.basiclab.iot.system.framework.security.filter;

import com.basiclab.iot.common.web.core.util.WebFrameworkUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 管理端点保护过滤器
 * 
 * 绕过 Spring Security 链中 /**.html permitAll 的限制，
 * 直接检查 Druid / Swagger / Actuator 端点的认证状态。
 */
public class ManagementEndpointProtectionFilter extends OncePerRequestFilter {

    private static final String[] PROTECTED_PATHS = {
            "/druid/",
            "/swagger-ui.html",
            "/v3/api-docs",
            "/actuator"
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        
        // 检查是否匹配受保护路径
        boolean isProtected = false;
        for (String p : PROTECTED_PATHS) {
            if (path.startsWith(p)) {
                isProtected = true;
                break;
            }
        }

        if (isProtected) {
            Long userId = WebFrameworkUtils.getLoginUserId(request);
            if (userId == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write("{\"code\":401,\"msg\":\"请先登录\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
