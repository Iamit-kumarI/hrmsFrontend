# HRMS Frontend - Troubleshooting Guide

## 🔍 Common Issues & Solutions

### Issue 1: Cannot Fetch Data from Backend

**Symptoms:**
- Dashboard shows "Loading dashboard..." forever
- Error alerts about failed API calls
- Console shows network errors

**Solutions:**

#### ✅ Step 1: Verify Backend is Running
```bash
# Check if backend is running on port 8080
curl http://localhost:8080/api/employees

# Or open in browser:
# http://localhost:8080/api/employees
```

**Expected Response:** JSON array of employees
```json
[
  {
    "id": "6986e8fb3255276e628daf77",
    "name": "Test Employee 5",
    "email": "emp5@example.com",
    "department": "Account",
    "role": "EMPLOYEE"
  }
]
```

#### ✅ Step 2: Check CORS Configuration

**Backend must allow CORS from `http://localhost:3000`**

Add to your Spring Boot backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

Or using `@CrossOrigin` annotation:
```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    // your code
}
```

#### ✅ Step 3: Check Browser Console

**Open Developer Tools (F12) and check:**
1. **Console Tab** - Look for error messages
2. **Network Tab** - Check API requests

**Common Console Errors:**

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`
**Solution:** Enable CORS on backend (see Step 2)

**Error:** `Failed to fetch`
**Solution:** Backend is not running or wrong URL

**Error:** `Unexpected token < in JSON at position 0`
**Solution:** Backend returned HTML instead of JSON (likely 404/error page)

#### ✅ Step 4: Verify API Endpoints

Test each endpoint manually:

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Get attendance summary
curl http://localhost:8080/api/attendance/summary

# Get specific employee attendance
curl http://localhost:8080/api/attendance/summary/YOUR_EMPLOYEE_ID
```

#### ✅ Step 5: Check Frontend Configuration

In `src/App.jsx`, verify:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

**Must NOT have trailing slash!**
- ✅ Correct: `http://localhost:8080/api`
- ❌ Wrong: `http://localhost:8080/api/`

---

### Issue 2: Empty Data Displayed

**Symptoms:**
- No errors, but lists are empty
- Stats show 0

**Solutions:**

1. **Add data to backend first**
   - Go to HR Management and create an HR user
   - Go to Employees and add some employees
   - Go to Attendance and mark attendance

2. **Check data in backend directly**
   ```bash
   curl http://localhost:8080/api/employees
   ```

---

### Issue 3: Network Error / Connection Refused

**Symptoms:**
- `ERR_CONNECTION_REFUSED`
- `net::ERR_FAILED`

**Solutions:**

1. **Backend not running**
   ```bash
   # Start your Spring Boot backend
   cd your-backend-folder
   ./mvnw spring-boot:run
   # or
   gradle bootRun
   ```

2. **Wrong port**
   - Verify backend runs on port 8080
   - Check `application.properties`:
     ```properties
     server.port=8080
     ```

3. **Firewall blocking**
   - Temporarily disable firewall
   - Or allow port 8080

---

### Issue 4: Data Not Updating

**Symptoms:**
- Create/update/delete doesn't reflect immediately

**Solutions:**

1. **Hard refresh browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Clear browser cache**

3. **Check if API call succeeded:**
   - Open Network tab in DevTools
   - Look for 200 status code

---

## 🧪 Debug Mode

The updated frontend now includes detailed console logging:

```javascript
// When you run the app, open browser console to see:
🔄 Fetching dashboard data...
📍 API URL: http://localhost:8080/api
📥 Fetching employees from: http://localhost:8080/api/employees
📊 Employees response status: 200
✅ Employees fetched: 5 employees
📄 Employee data: [...]
```

---

## 📝 Testing Checklist

Before reporting issues, verify:

- [ ] Backend is running (`http://localhost:8080/api/employees` works in browser)
- [ ] CORS is enabled on backend
- [ ] Frontend is running (`npm run dev` shows no errors)
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows API calls being made
- [ ] API calls return 200 status codes
- [ ] Backend has data (test with curl/Postman)

---

## 🔧 Quick Test

**Test if everything is connected:**

1. Open browser console (F12)
2. Run in console:
   ```javascript
   fetch('http://localhost:8080/api/employees')
     .then(r => r.json())
     .then(d => console.log('Employees:', d))
     .catch(e => console.error('Error:', e))
   ```

**Expected:** See array of employees
**If error:** Backend or CORS issue

---

## 🆘 Still Not Working?

**Collect this information:**

1. **Browser console errors** (screenshot)
2. **Network tab** (screenshot showing failed requests)
3. **Backend console output**
4. **Test results:**
   ```bash
   curl http://localhost:8080/api/employees
   ```

Then check:
- Is backend Spring Boot or different framework?
- What port is backend actually on?
- Any authentication/security configured?

---

## 💡 Pro Tips

1. **Always check console first** - 90% of issues show there
2. **Test backend independently** - Use Postman or curl
3. **One thing at a time** - Fix CORS before checking data
4. **Clear cache often** - `Ctrl+Shift+R`
5. **Check Network tab** - See exactly what's being sent/received

---

## 🎯 Most Common Fix

**If nothing works, try this:**

1. Stop frontend and backend
2. Start backend first, verify it's running:
   ```bash
   curl http://localhost:8080/api/employees
   ```
3. Add CORS configuration to backend
4. Restart backend
5. Start frontend:
   ```bash
   npm run dev
   ```
6. Hard refresh browser: `Ctrl+Shift+R`

---

## 📞 Need More Help?

Check the detailed console logs now included in the updated components!
