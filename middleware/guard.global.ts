import { useAuth } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();

  // Define pages that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // Check if the current route requires authentication
  if (protectedRoutes.includes(to.path) && !auth.data.value?.user) {
    return navigateTo("/");
  }
});
