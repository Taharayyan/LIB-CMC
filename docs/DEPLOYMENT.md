# Deployment Guide

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15+ (for production)
- Redis (optional, for caching)

## Local Development

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=4000
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgres://user:password@localhost:5432/cmc_library
NODE_ENV=development
```

5. Start the backend:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "VITE_API_BASE_URL=http://localhost:4000" > .env
```

4. Start the frontend:
```bash
npm run dev
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd CMC_LIBRARY
```

2. Update environment variables in `docker-compose.yml`:
```yaml
environment:
  JWT_SECRET: your-super-secret-jwt-key-change-in-production
  DATABASE_URL: postgres://cmc_user:cmc_password@postgres:5432/cmc_library
```

3. Start all services:
```bash
docker-compose up -d
```

4. Check logs:
```bash
docker-compose logs -f
```

### Manual Docker Build

1. Build the image:
```bash
docker build -t cmc-library .
```

2. Run the container:
```bash
docker run -p 4000:4000 \
  -e DATABASE_URL=postgres://user:password@host:5432/db \
  -e JWT_SECRET=your-secret-key \
  cmc-library
```

## Production Deployment

### Environment Variables

Create a `.env` file with the following variables:

```env
# Server
NODE_ENV=production
PORT=4000

# Database
DATABASE_URL=postgres://username:password@host:5432/database_name

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Redis (optional)
REDIS_URL=redis://localhost:6379

# File Uploads
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE cmc_library;
CREATE USER cmc_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE cmc_library TO cmc_user;
```

2. Run migrations:
```bash
# Using the schema file
psql -h localhost -U cmc_user -d cmc_library -f database/schema.sql

# Or using individual migration files
for file in database/migrations/*.sql; do
  psql -h localhost -U cmc_user -d cmc_library -f "$file"
done
```

### Nginx Configuration

1. Install Nginx:
```bash
sudo apt update
sudo apt install nginx
```

2. Copy the nginx configuration:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/cmc-library
sudo ln -s /etc/nginx/sites-available/cmc-library /etc/nginx/sites-enabled/
```

3. Test and reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate (Let's Encrypt)

1. Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtain SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

3. Auto-renewal:
```bash
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Process Management (PM2)

1. Install PM2:
```bash
npm install -g pm2
```

2. Create PM2 ecosystem file:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'cmc-library-backend',
    script: 'server.js',
    cwd: './backend',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    }
  }]
};
```

3. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Monitoring

1. Install monitoring tools:
```bash
npm install -g pm2-logrotate
```

2. Set up log rotation:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## Health Checks

### Backend Health Check
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "ok"
}
```

### Database Health Check
```bash
psql -h localhost -U cmc_user -d cmc_library -c "SELECT 1;"
```

### Frontend Health Check
```bash
curl http://localhost:5173
```

## Backup and Recovery

### Database Backup
```bash
pg_dump -h localhost -U cmc_user cmc_library > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore
```bash
psql -h localhost -U cmc_user -d cmc_library < backup_file.sql
```

### File Uploads Backup
```bash
tar -czf uploads_backup_$(date +%Y%m%d_%H%M%S).tar.gz uploads/
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check firewall settings

2. **JWT Token Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify token format

3. **File Upload Issues**
   - Check upload directory permissions
   - Verify file size limits
   - Check disk space

4. **Socket.IO Connection Issues**
   - Check CORS settings
   - Verify WebSocket support
   - Check firewall rules

### Logs

Backend logs:
```bash
# Docker
docker-compose logs backend

# PM2
pm2 logs cmc-library-backend

# Direct
tail -f backend/logs/app.log
```

Nginx logs:
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access

3. **File Uploads**
   - Validate file types
   - Scan for malware
   - Limit file sizes

4. **API Security**
   - Rate limiting
   - Input validation
   - CORS configuration

5. **SSL/TLS**
   - Use HTTPS in production
   - Regular certificate renewal
   - Strong cipher suites
