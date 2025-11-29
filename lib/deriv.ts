const DERIV_APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID || "111752"; // Default to a demo app id if not set
const DERIV_WS_URL = `wss://ws.binaryws.com/websockets/v3?app_id=${DERIV_APP_ID}`;

export class DerivAPI {
  private ws: WebSocket | null = null;
  private token: string | null = null;

  constructor(token?: string) {
    this.token = token || null;
  }

  connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve(this.ws);
        return;
      }

      this.ws = new WebSocket(DERIV_WS_URL);

      this.ws.onopen = () => {
        console.log("Deriv WS Connected");
        if (this.token) {
          this.authorize(this.token);
        }
        resolve(this.ws!);
      };

      this.ws.onerror = (err) => {
        console.error("Deriv WS Error", err);
        reject(err);
      };

      this.ws.onclose = () => {
        console.log("Deriv WS Closed");
        this.ws = null;
      };
    });
  }

  async send(request: any): Promise<any> {
    const ws = await this.connect();
    
    return new Promise((resolve, reject) => {
      const onMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // Simple correlation check could be added here using req_id
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
        // Cleanup listener after one message (simplified for demo)
        ws.removeEventListener("message", onMessage);
      };

      ws.addEventListener("message", onMessage);
      ws.send(JSON.stringify(request));
    });
  }

  async authorize(token: string) {
    return this.send({ authorize: token });
  }

  async getBalance() {
    return this.send({ balance: 1, subscribe: 1 });
  }

  async getAccountList() {
    return this.send({ account_list: 1 });
  }
}

export const derivAuthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${DERIV_APP_ID}`;
