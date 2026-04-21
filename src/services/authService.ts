const API_BASE = '/api/auth';

export interface AuthUser {
  id: string | number;
  username: string;
  email: string;
  skillsToTeach?: string[];
  skillsToLearn?: string[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// ─── Token Management ───
export function getToken(): string | null {
  return localStorage.getItem('quest_token');
}

export function setToken(token: string): void {
  localStorage.setItem('quest_token', token);
}

export function removeToken(): void {
  localStorage.removeItem('quest_token');
}

// ─── API Calls ───

export async function signupUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  // Mock signup for static frontend deployment
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.password && data.username) {
        const mockUser = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          username: data.username,
          email: data.email,
        };
        setToken('mock-jwt-token-12345');
        resolve({ token: 'mock-jwt-token-12345', user: mockUser });
      } else {
        reject(new Error('Invalid missing fields'));
      }
    }, 500);
  });
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  // Mock login for static frontend deployment
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email /* any email or password works for the demo */) {
        const mockUser = {
          id: 'user-123',
          username: data.email.split('@')[0],
          email: data.email,
        };
        setToken('mock-jwt-token-abcd');
        resolve({ token: 'mock-jwt-token-abcd', user: mockUser });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;
  // Mock session restore
  return {
    id: 'user-123',
    username: 'DemoUser',
    email: 'demo@example.com'
  };
}

export function logoutUser(): void {
  removeToken();
}

export async function updateProfileSkills(data: {
  skillsToTeach?: string[];
  skillsToLearn?: string[];
}): Promise<AuthUser> {
  const token = getToken();
  if (!token) throw new Error('Unauthorized');

  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update profile');
  return json.user;
}

export async function fetchCaptcha(): Promise<{ token: string; question: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock-captcha-token', question: 'What is 5 + 3?' });
    }, 300);
  });
}


