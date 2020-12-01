
package business;

import business.firm.Firm;
import business.round.Round;
import business.round.RoundDao;
import business.firm.FirmDao;
import business.firm.FirmDaoJdbc;
import business.round.RoundDaoJdbc;

public class ApplicationContext {

    private final FirmDao firmDao;
    private final RoundDao roundDao;

    public static ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {
        firmDao = new FirmDaoJdbc();
        roundDao = new RoundDaoJdbc();
    }

    public FirmDao getFirmDao() {
        return firmDao;
    }

    public RoundDao getRoundDao() {
        return roundDao;
    }

}
