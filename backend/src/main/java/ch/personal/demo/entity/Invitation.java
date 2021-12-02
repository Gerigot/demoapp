package ch.personal.demo.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Invitation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "talk_id", nullable = false)
    @JsonBackReference
    private Talk talk;
    
    private boolean absent;
    
    private Date created;
    private Date updated;
  
    @PrePersist
    protected void onCreate() {
      created = new Date();
    }
  
    @PreUpdate
    protected void onUpdate() {
      updated = new Date();
    }
    
    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Talk getTalk() {
        return talk;
    }
    public void setTalk(Talk talk) {
        this.talk = talk;
    }

    public boolean isAbsent() {
        return absent;
    }

    public void setAbsent(boolean absent) {
        this.absent = absent;
    }

   public Date getUpdated() {
       return updated;
   }

   public Date getCreated() {
       return created;
   }


   @Override
    public int hashCode() {
        return java.util.Objects.hashCode(user.getUsername());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (obj instanceof Invitation) {
            if (((Invitation) obj).getUser().getUsername().equals(user.getUsername())) {
                return true;
            }
        }

        return false;
    }

}
