const config = {
  rows: 50,
  cols: 50,
  coords: [
    [25, 25],
    [24, 25],
    [25, 24],
    [26, 25],
    [26, 26],
  ],
};

export function GET() {
  return Response.json(config);
}
