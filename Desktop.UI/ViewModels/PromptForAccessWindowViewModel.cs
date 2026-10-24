using Avalonia.Controls;
using Remotely.Desktop.Shared.Reactive;
using Microsoft.Extensions.Logging;
using System.Windows.Input;
using Remotely.Desktop.Shared.Services;


namespace Remotely.Desktop.UI.ViewModels;

public interface IPromptForAccessWindowViewModel : IBrandedViewModelBase
{
    string OrganizationName { get; set; }
    bool PromptResult { get; set; }
    string RequesterName { get; set; }
    string RequestMessage { get; }
    ICommand SetResultNo { get; }
    ICommand SetResultYes { get; }
}

public class PromptForAccessWindowViewModel : BrandedViewModelBase, IPromptForAccessWindowViewModel
{
    public PromptForAccessWindowViewModel(
        string requesterName,
        string organizationName,
        IBrandingProvider brandingProvider,
        IUiDispatcher dispatcher,
        ILogger<BrandedViewModelBase> logger)
        : base(brandingProvider, dispatcher, logger)
    {
        if (!string.IsNullOrWhiteSpace(requesterName))
        {
            RequesterName = requesterName;
        }

        if (!string.IsNullOrWhiteSpace(organizationName))
        {
            OrganizationName = organizationName;
        }
    }

    public string OrganizationName
    {
        get => Get<string>() ?? Loc.DefaultOrganization;
        set
        {
            Set(value);
            NotifyPropertyChanged(nameof(RequestMessage));
        }

    }

    public bool PromptResult { get; set; }

    public string RequesterName
    {
        get => Get<string>() ?? Loc.DefaultRequester;
        set
        {
            Set(value);
            NotifyPropertyChanged(nameof(RequestMessage));
        }
    }

    public string RequestMessage
    {
        get
        {
            return Loc.AllowRequest(RequesterName, OrganizationName);
        }
    }
    public ICommand SetResultNo => new RelayCommand<Window>(window =>
    {
        PromptResult = false;
        if (window is not null)
        {
            window.Close();
        }
    });

    public ICommand SetResultYes => new RelayCommand<Window>(window =>
    {
        PromptResult = true;
        if (window is not null)
        {
            window.Close();
        }
    });
}
