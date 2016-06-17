package utils;

import az.Vortex.SpringDevelopers.dto.MailDTO;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import com.sun.mail.smtp.SMTPTransport;
import java.util.Properties;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class MailUtil {
    
    public static ResponseDTO sendEmail(MailDTO consultation) throws CustomException {
        ResponseDTO response = new ResponseDTO();
        final String username = "AKIAJFV2BGIHMWCC3FUQ";
        final String password = "AoIzXtJ0/uXf50+HfDphXFWLl0fBG/aTRtxyPerStz0d";
        final String host = "email-smtp.us-west-2.amazonaws.com";
        final String port = "465";
        try {
            Properties props = new Properties();
            props.setProperty("mail.transport.protocol", "aws");
            props.setProperty("mail.aws.user", username);
            props.setProperty("mail.aws.password", password);
            
            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                        @Override
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(username, password);
                        }
                    });
            
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("PCDERSLERIM <noreply@pcderslerim.com>"));
            msg.setRecipients(Message.RecipientType.BCC,
                    InternetAddress.parse(consultation.getTo(), false));
            msg.setSubject(consultation.getSubject());
            msg.setContent(consultation.getMessage(),"text/html; charset=utf-8");
            msg.setHeader("X-Mailer", "Pass link");
            msg.setSentDate(new Date());
            SMTPTransport t
                    = (SMTPTransport) session.getTransport("smtps");
            t.connect(host, username, password);
            t.sendMessage(msg, msg.getAllRecipients());
            System.out.println("Response: " + t.getLastServerResponse());
            t.close();
            response.setSuccessMessage("Your email successfully send.We will contact with you soon.Thanks");
        } catch (MessagingException e) {
            throw new CustomException(e.toString(), "Can not send email");
        }
        
        return response;
    }
    
    public static void main(String[] args) throws CustomException {
        MailDTO consultation = new MailDTO();
        consultation.setMessage("HEllo");
        consultation.setSubject("Hi");
        consultation.setTo("serxanresullu@gmail.com");
        sendEmail(consultation);
    }
}
