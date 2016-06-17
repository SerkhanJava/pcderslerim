package az.Vortex.SpringDevelopers.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

            @Component
            public class CustomHandlerAccessInterceptor extends HandlerInterceptorAdapter {


                AuthorizationUtil authorization = new AuthorizationUtil();

                @Override
                public boolean preHandle(
                        HttpServletRequest request,
                        HttpServletResponse response,
                        Object handler) throws Exception {
                    System.out.println("token="+request.getHeader("token"));
//                    authorization.refreshSession(request.getHeader("token"));
                    return true;
                }

                @Override
                 public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
                     System.out.println("postHandle");
                }

                @Override
                public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
                    System.out.println("afterCompletion");
                }

                @Override
                public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                    System.out.println("afterConcurrentHandlingStarted");
                }
}
