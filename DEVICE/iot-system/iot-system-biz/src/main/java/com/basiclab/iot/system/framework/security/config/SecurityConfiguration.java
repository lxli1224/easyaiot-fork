package com.basiclab.iot.system.framework.security.config;

import com.basiclab.iot.common.config.AuthorizeRequestsCustomizer;
import com.basiclab.iot.system.enums.ApiConstants;
import com.basiclab.iot.system.framework.security.filter.ManagementEndpointProtectionFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;

/**
 * SecurityConfiguration
 *
 * @author 翱翔的雄库鲁
 * @email andywebjava@163.com
 * @wechat EasyAIoT2025
 */
@Configuration(proxyBeanMethods = false, value = "systemSecurityConfiguration")
public class SecurityConfiguration {

    /**
     * 注册管理端点保护过滤器（Servlet 级别，先于 Spring Security 执行）
     * 
     * 绕过 common-security 中 /**
     * .html permitAll 的限制，
     * 保护 Druid / Swagger / Actuator 端点。
     */
    @Bean
    public FilterRegistrationBean<ManagementEndpointProtectionFilter> managementEndpointProtectionFilter() {
        FilterRegistrationBean<ManagementEndpointProtectionFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new ManagementEndpointProtectionFilter());
        registration.addUrlPatterns(
            "/druid/*",
            "/swagger-ui.html",
            "/v3/api-docs", "/v3/api-docs/*",
            "/actuator", "/actuator/*"
        );
        registration.setOrder(-100);
        return registration;
    }

    @Bean("systemAuthorizeRequestsCustomizer")
    public AuthorizeRequestsCustomizer authorizeRequestsCustomizer() {
        return new AuthorizeRequestsCustomizer() {

            @Override
            public void customize(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) {
                // RPC 服务的安全配置（内部调用仍需认证）
                registry.antMatchers(ApiConstants.PREFIX + "/**").authenticated();
            }

        };
    }

}
