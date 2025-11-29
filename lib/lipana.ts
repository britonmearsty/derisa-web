const LIPANA_API_URL = "https://api.lipana.dev/v1"; // Verify actual URL from docs
const LIPANA_API_KEY = process.env.LIPANA_API_KEY;
const LIPANA_API_SECRET = process.env.LIPANA_API_SECRET;

export async function initiateSTKPush(phone: string, amount: number) {
  // This should ideally be a server action or API route to hide secrets
  // For demo purposes, we'll mock the structure or assume a proxy
  
  console.log("Initiating STK Push", { phone, amount });

  // Mock response for now as we don't have real keys
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "STK Push initiated successfully",
        transaction_id: "LIPANA_" + Math.random().toString(36).substring(7),
      });
    }, 2000);
  });
}

export async function initiateB2C(phone: string, amount: number) {
    console.log("Initiating B2C Withdraw", { phone, amount });
    
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Withdrawal initiated successfully",
            transaction_id: "LIPANA_W_" + Math.random().toString(36).substring(7),
          });
        }, 2000);
      });
}
