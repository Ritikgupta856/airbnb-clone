import getCurrenUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";


const FavoritesPage = async () => {

    const currentUser = await getCurrenUser();

    const listings = await getFavoriteListings();


    if (listings.length === 0) {
        return (
            <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings" />
        )
    }

   
    return(
        <FavoritesClient
        listings={listings}
        currentUser={currentUser}/>
    )

}

export default FavoritesPage;