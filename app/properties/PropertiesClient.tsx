'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";

import Heading from "../components/Heading";
import { SafeListing,SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface PropertiesClientProps{
    listings : SafeListing[];
    currentUser?: SafeUser | null
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,currentUser
}) => {

    const router = useRouter();

    const [deletingId,setDeletingId] = useState('');

    const onCancel = useCallback ((id:string)=>{
        setDeletingId(id);
        const cancelPromise = axios.delete(`/api/listings/${id}`);
        toast.promise(
            cancelPromise,
            {
                loading: 'Deleting Listing...',
                success: 'Listing Deleted!',
                error: (error) => {
                    return error?.response?.data?.error || 'An error occurred';
                },
            }
        )
        .finally(()=>{
            setDeletingId('')
            router.refresh()
        })
    },[router])

    return (
      <Container>
        <Heading title="Properties" subtitle="List of your Properties"/>
        <div className="mt-10 grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
         {listings.map((listing)=>(
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled = {deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
            
            />
         ))}
        </div>
      </Container>
    );
}

export default PropertiesClient;