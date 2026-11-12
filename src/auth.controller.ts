import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import type { AuthUser } from './auth.types';

const accounts: Record<string, { password: string }> = {
  writer: { password: 'writer1234!' },
  reviewer: { password: 'reviewer1234!' },
  'factory-user': { password: 'factory1234!' },
};

@Controller('api')
export class AuthController {
  @Get('session')
  getSession(@Req() request: Request): { user: AuthUser | null } {
    return { user: request.session.user ?? null };
  }

  @Post('login')
  login(
    @Body() credentials: { username?: unknown; password?: unknown },
    @Req() request: Request,
  ): { user: AuthUser } | { error: string } {
    const suppliedUsername = credentials?.username;
    const password = credentials?.password;
    const username = typeof suppliedUsername === 'string' ? suppliedUsername : undefined;
    const account = username ? accounts[username] : undefined;

    if (!username || !account || account.password !== password) {
      return { error: '\uB85C\uADF8\uC778 \uC815\uBCF4\uB97C \uD655\uC778\uD558\uC138\uC694.' };
    }

    const user: AuthUser = { username, role: username };
    request.session.user = user;
    return { user };
  }

  @Post('logout')
  async logout(@Req() request: Request): Promise<{ user: null }> {
    await new Promise<void>((resolve, reject) => {
      request.session.destroy((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    return { user: null };
  }
}