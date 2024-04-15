import * as querystring from 'querystring';
import { access_token } from './types';
class RedditPoster {
    private clientId: string;
    private clientSecret: string;
    private username: string;
    private password: string;

    constructor(clientId: string, clientSecret: string, username: string, password: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.username = username;
        this.password = password;
    }

    private async getAccessToken(): Promise<string> {
        const authData: string = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

        const res = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authData}`
            },
            body: querystring.stringify({
                grant_type: 'password',
                username: this.username,
                password: this.password
            })
        });

        const data = await res.json() as unknown as access_token;
        return data.access_token;
    }

    public async post(content: string, title: string): Promise<any> {
        const accessToken = await this.getAccessToken();

        const postData = querystring.stringify({
            sr: `u_${this.username}`, // Posting to your own profile
            kind: 'self',
            text: content,
            title: title,
        });

        const res = await fetch('https://oauth.reddit.com/api/submit', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'nodejs/1.0'
            },
            body: postData
        });

        const responseData = await res.json();
        return responseData;
    }
}

// Usage
(async () => {
    try {
        // Initialize RedditPoster with credentials
        const redditPoster = new RedditPoster(
            'T_E6WsmMqqSY0t1-Pq870g',
            'dqYdnjZGdc9atGLiCl4P7IB0UR8nKA',
            'Human_Sea_9061',
            'Lm025197!'
        );

        // Post to Reddit
        const response = await redditPoster.post('Example post', 'Hopefullt this works!');
        console.log('Post submitted:', response);
    } catch (error) {
        console.error('Error:', error);
    }
})();
