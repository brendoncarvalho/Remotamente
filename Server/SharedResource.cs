using Microsoft.Extensions.Localization;

// The assembly name (Remotely_Server) differs from the root namespace, so tell the
// localizer where the embedded .resx resources live.
[assembly: RootNamespace("Remotely.Server")]

namespace Remotely.Server;

/// <summary>
/// Marker type for the UI string resources (Resources/SharedResource.*.resx).
/// The English text is used as the resource key, so a missing translation
/// falls back to English.
/// </summary>
public class SharedResource
{
}
