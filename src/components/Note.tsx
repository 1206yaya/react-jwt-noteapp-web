import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import { useMutateAuth } from "../hooks/useMutateAuth"

function Note() {
    const { logoutMutation } = useMutateAuth()
    const logout = async () => {
        await logoutMutation.mutateAsync()
    }
  return (
    <div>
        <ArrowRightOnRectangleIcon onClick={logout} className="w-6 h-6 text-blue-500cursor-pointer" />
    </div>
  )
}

export default Note