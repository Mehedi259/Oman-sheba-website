import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://188.245.212.240';

async function proxyUsersRequest(req: NextRequest, paramsPromise: Promise<{ path: string[] }>) {
  const { path } = await paramsPromise;
  const subPath = path ? path.join('/') : '';
  const trailingSlash = subPath ? (subPath.endsWith('/') ? '' : '/') : '';
  const targetUrl = `${BACKEND_URL}/api/users/${subPath}${trailingSlash}`;

  const headers = new Headers();
  req.headers.forEach((val, key) => {
    const k = key.toLowerCase();
    if (k !== 'host' && k !== 'connection' && k !== 'content-length') {
      headers.set(key, val);
    }
  });

  try {
    let body: any = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await req.arrayBuffer();
    }

    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
    });

    const resBuffer = await backendRes.arrayBuffer();
    const resHeaders = new Headers();
    backendRes.headers.forEach((val, key) => {
      const k = key.toLowerCase();
      if (k !== 'transfer-encoding' && k !== 'content-encoding') {
        resHeaders.set(key, val);
      }
    });

    return new NextResponse(resBuffer, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: resHeaders,
    });
  } catch (err) {
    console.error('Next.js Users API Proxy Error:', err);
    return NextResponse.json(
      { error: 'Failed to connect to backend server' },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}

export async function OPTIONS(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyUsersRequest(req, params);
}
