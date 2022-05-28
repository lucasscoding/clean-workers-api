import 'module-alias/register'
import { AppServer } from '@/main/app-server'
import Dotenv from 'dotenv'

Dotenv.config({ path: '.env' })
AppServer.run()
