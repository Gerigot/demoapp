package ch.personal.demo.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Talk {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String talkName;

    private Date talkDate;

    private Date lastUpdate;

    @JsonManagedReference
    @OneToMany(mappedBy = "talk")
    private Set<Invitation> expectedParticipants;
  
    @PrePersist
    protected void onCreate() {
        lastUpdate = new Date();
    }
  
    @PreUpdate
    protected void onUpdate() {
        lastUpdate = new Date();
    }
    
    public Talk() {
    }

    public long getId() {
        return id;
    }

    public String getTalkName() {
        return talkName;
    }
    public void setTalkName(String talkName) {
        this.talkName = talkName;
    }

   public Date getTalkDate() {
       return talkDate;
   }

   public void setTalkDate(Date talkDate) {
       this.talkDate = talkDate;
   }

   public Date getLastUpdate() {
       return lastUpdate;
   }

   public Set<Invitation> getExpectedParticipants() {
       return expectedParticipants;
   }
   
}
