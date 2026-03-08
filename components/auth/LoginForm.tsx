"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertMessage } from "@/components/common/AlertMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useApiProcessor } from "@/hooks/useApiProcessor";
import { setSessionCookie } from "@/lib/auth";
import { ACT_ID } from "@/types/api";
import type { LoginResponseData } from "@/types/api";

export function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { execute, isLoading, error, reset } =
    useApiProcessor<LoginResponseData>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    const result = await execute(ACT_ID.LOGIN, { user_id: userId, password });
    console.log(result);
    if (result.code === 0 && result.data[0]) {
      setSessionCookie(result.data[0]);
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          {error && <AlertMessage type="error" message={error} />}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
}
