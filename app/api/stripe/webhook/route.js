export async function POST(request) {
  // TODO: verify Stripe signature and handle events
  // For now just return 200 OK so the route exists
  return new Response('ok', { status: 200 });
}
