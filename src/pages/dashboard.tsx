import { useQueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '@/components/Layout'
import { UserInfo } from '@/components/UserInfo'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'

const DashBoard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  /**
   * ログアウトする
   */
  const logout = async () => {
    queryClient.removeQueries(['tasks'])
    queryClient.removeQueries(['user']) // cacheのクリア
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      <TaskForm />
      <TaskList />
    </Layout>
  )
}

export default DashBoard
