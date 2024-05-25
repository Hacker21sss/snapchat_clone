import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { UserDocument } from "./models/user.model";
import { Loader2 } from "lucide-react";
import { sendSnapMessage } from "@/lib/serveractions";
import { useRouter } from "next/navigation";


export function UserPreview({ selectedFile, close, onPreview }: { selectedFile: string, close: () => void, onPreview: () => void }) {
    const [users, setUsers] = useState<UserDocument[]>([]);
    const [sendMessageLoading, setsendMessageLoading] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserDocument | null>(null);
    const sendSnapMessageHandler = async () => {
        try {
            setsendMessageLoading(true);
            await sendSnapMessage(
                selectedFile, selectedUser?._id, 'image'
            );
            router.push(`/chat/${selectedUser?._id}`)
        } catch (error) {
            console.log(error);
            throw error;

        } finally {
            setsendMessageLoading(false);
        }
    }
    const selectedUserHandler = (user: UserDocument) => {
        setSelectedUser(user);

    }

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/chat/getusers');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Call the fetchUsers function to fetch user data
    }, []); // Make sure to pass an empty dependency array to useEffect to run only once on component mount

    return (
        <Dialog open={!!selectedFile}>
            <DialogContent onInteractOutside={close} className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col">
                <DialogHeader>
                    <div className="flex items-center relative h-3/4 my-auto ">
                        <Input
                            type="text"
                            placeholder="Search user to send snap"
                            id="name"
                        />
                    </div>
                </DialogHeader>
                <div className="grid gap-1 py-4">
                    {users.map((user: UserDocument) => {
                        return (
                            <div key={user._id}onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user._id ? "bg-gray-200" : null
                                } flex items-center cursor-pointer gap-5 p-2 rounded-md hover:bg-gray-200`}>

                                <Avatar>
                                    <AvatarImage src={user.profilephoto} alt={'user'} /> {/* Pass the correct src attribute */}
                                </Avatar>

                                <div >
                                    <h1 className="font-medium">
                                        {user.fullname}
                                    </h1>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                </div>
                            </div>
                        )
                    })
                    }
                    {
                        loading &&

                        <div className="mx-auto">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>

                        </div>
                    }
                </div>
                <DialogFooter>
                    <Button onClick={close}>cancel</Button>
                    {

                        sendMessageLoading ? (
                            <Button onClick={sendSnapMessageHandler} type="submit">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                please wait....


                            </Button>
                        ) : (
                            <Button onClick={sendSnapMessageHandler} type="submit">send</Button>
                        )
                    }



                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
