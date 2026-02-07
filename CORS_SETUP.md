# Backend CORS Configuration

## ⚠️ IMPORTANT: Enable CORS on Your Backend

The frontend runs on `http://localhost:3000` and backend on `http://localhost:8080`.
You MUST enable CORS to allow cross-origin requests.

---

## 🔧 Spring Boot CORS Configuration

### Option 1: Global CORS Configuration (Recommended)

Create a configuration class in your Spring Boot backend:

**File: `src/main/java/com/yourpackage/config/WebConfig.java`**

```java
package com.yourpackage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

### Option 2: Controller-Level CORS

Add `@CrossOrigin` annotation to your controllers:

```java
package com.yourpackage.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        // your code
    }
    
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        // your code
    }
    
    // ... other methods
}
```

Apply to all controllers:
- EmployeeController
- AttendanceController
- AdminController

---

### Option 3: Method-Level CORS

Add to specific methods:

```java
@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/employees")
public List<Employee> getAllEmployees() {
    // your code
}
```

---

## 🧪 Verify CORS is Working

### Test in Browser Console:

```javascript
fetch('http://localhost:8080/api/employees')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e))
```

**Expected:** See employee data
**Error:** CORS is not configured

---

## 🔍 Check CORS Headers

### Using curl:

```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     http://localhost:8080/api/employees
```

**Expected Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: *
```

---

## 📝 Common CORS Errors

### Error 1: "No 'Access-Control-Allow-Origin' header"
**Cause:** CORS not enabled on backend
**Fix:** Add CORS configuration (see above)

### Error 2: "CORS policy: Method not allowed"
**Cause:** Missing HTTP method in `allowedMethods`
**Fix:** Add the method: `.allowedMethods("GET", "POST", "PUT", "DELETE")`

### Error 3: "Credentials flag is true, but Access-Control-Allow-Credentials is not"
**Cause:** Missing credentials configuration
**Fix:** Add `.allowCredentials(true)`

---

## 🚀 Production Configuration

For production, replace `http://localhost:3000` with your actual domain:

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",  // development
                "https://yourdomain.com"   // production
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

---

## ⚙️ Alternative: Spring Security CORS

If using Spring Security:

```java
package com.yourpackage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            // ... other security config
            ;
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

---

## ✅ Quick Checklist

Before running the frontend, verify:

- [ ] CORS configuration added to backend
- [ ] Backend restarted after adding CORS config
- [ ] Backend running on `http://localhost:8080`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Tested CORS with curl or browser console
- [ ] No firewall blocking ports 3000 or 8080

---

## 🆘 Still Not Working?

1. **Restart backend** after adding CORS configuration
2. **Clear browser cache**: Ctrl+Shift+R
3. **Check backend console** for any errors
4. **Test with Postman** to verify endpoints work
5. **Open browser DevTools** (F12) → Network tab → Check request headers

---

## 💡 Development vs Production

**Development (Current):**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- CORS: Allow `localhost:3000`

**Production:**
- Frontend: `https://yourdomain.com`
- Backend: `https://api.yourdomain.com`
- CORS: Allow `yourdomain.com`

Update CORS configuration when deploying!
