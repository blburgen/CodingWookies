import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, rating, comment } = body;

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Fields are missing" },
        { status: 400 },
      );
    }

    console.log("--- New Review Received ---");
    console.log(`Product ID: ${productId}`);
    console.log(`Rating: ${rating} Stars`);
    console.log(`Comment: ${comment}`);
    console.log("---------------------------");

    return NextResponse.json(
      {
        success: true,
        message: "Review received successfully",
        data: { productId, rating, comment, created_at: new Date() },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error during review insertion:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
