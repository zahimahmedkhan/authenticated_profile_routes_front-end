"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookieDebugger() {
  const [cookies, setCookies] = useState({});
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    // Get all cookies
    const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    setCookies(allCookies);
  }, []);

  const testCookieAPI = async () => {
    try {
      const response = await fetch('/api/test-cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
        credentials: 'include',
      });
      
      const result = await response.json();
      setTestResult(result);
      
      // Refresh cookies after test
      setTimeout(() => {
        const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        setCookies(allCookies);
      }, 1000);
    } catch (error) {
      setTestResult({ error: error.message });
    }
  };

  const testBackendCookie = async () => {
    try {
      const response = await fetch('https://profile-routes-backend.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword',
        }),
        credentials: 'include',
      });
      
      const result = await response.json();
      setTestResult({ backendTest: result });
      
      // Check if any cookies were set
      setTimeout(() => {
        const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        setCookies(allCookies);
      }, 1000);
    } catch (error) {
      setTestResult({ backendError: error.message });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Cookie Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Current Cookies:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(cookies, null, 2)}
          </pre>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={testCookieAPI} variant="outline">
            Test Local API Cookie
          </Button>
          <Button onClick={testBackendCookie} variant="outline">
            Test Backend Cookie
          </Button>
        </div>
        
        {testResult && (
          <div>
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p><strong>Note:</strong> This debugger helps identify cookie issues.</p>
          <p>• Check if cookies are being set by the backend</p>
          <p>• Verify CORS configuration</p>
          <p>• Ensure proper domain settings</p>
        </div>
      </CardContent>
    </Card>
  );
} 